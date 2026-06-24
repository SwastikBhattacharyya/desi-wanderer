CREATE OR REPLACE FUNCTION comments_before_insert()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.is_approved
    AND NOT has_authority('SCOPE_comments:approve') AND NOT has_authority('SCOPE_comment_reports:cdc') THEN
    NEW.is_approved := FALSE;
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION comments_before_update()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.content IS DISTINCT FROM OLD.content THEN
    IF current_subject_id() IS DISTINCT FROM OLD.author_id THEN
      NEW.content := OLD.content;
    ELSE
      NEW.is_approved := FALSE;
    END IF;
  END IF;

  IF NEW.is_approved
    AND NOT OLD.is_approved THEN
      IF NOT has_authority('SCOPE_comments:approve') AND NOT has_authority('SCOPE_comment_reports:cdc') THEN
      NEW.is_approved := OLD.is_approved;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER t_before_insert_comments
BEFORE INSERT ON comments
FOR EACH ROW
EXECUTE FUNCTION comments_before_insert();

CREATE TRIGGER t_before_update_comments
BEFORE UPDATE ON comments
FOR EACH ROW
EXECUTE FUNCTION comments_before_update();

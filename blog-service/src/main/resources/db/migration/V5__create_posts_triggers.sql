CREATE OR REPLACE FUNCTION posts_before_insert()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.is_approved
    AND NOT has_authority('SCOPE_posts:approve') THEN
    NEW.is_approved := FALSE;
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION posts_before_update()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF ROW(
    NEW.slug,
    NEW.title,
    NEW.description,
    NEW.content,
    NEW.is_published
  ) IS DISTINCT FROM ROW(
    OLD.slug,
    OLD.title,
    OLD.description,
    OLD.content,
    OLD.is_published
  ) THEN
    IF current_subject_id() IS DISTINCT FROM OLD.author_id THEN
      NEW.slug := OLD.slug;
      NEW.title := OLD.title;
      NEW.description := OLD.description;
      NEW.content := OLD.content;
      NEW.is_published := OLD.is_published;
    END IF;
  END IF;

  IF ROW(
    NEW.slug,
    NEW.title,
    NEW.description,
    NEW.content
  ) IS DISTINCT FROM ROW(
    OLD.slug,
    OLD.title,
    OLD.description,
    OLD.content
  ) THEN
    IF NOT has_authority('SCOPE_posts:approve') AND NOT has_authority('SCOPE_post_reports:cdc') THEN
      NEW.is_approved := FALSE;
    END IF;
  END IF;

  IF NEW.is_approved
    AND NOT OLD.is_approved THEN
      IF NOT has_authority('SCOPE_posts:approve') AND NOT has_authority('SCOPE_post_reports:cdc') THEN
      NEW.is_approved := OLD.is_approved;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER posts_before_insert_trigger
BEFORE INSERT ON posts
FOR EACH ROW
EXECUTE FUNCTION posts_before_insert();

CREATE TRIGGER posts_before_update_trigger
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION posts_before_update();

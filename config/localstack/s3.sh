#!/bin/sh
set -e

BUCKET="desi-wanderer"

if awslocal s3api head-bucket --bucket "$BUCKET" >/dev/null 2>&1; then
    echo "Bucket $BUCKET already exists. Skipping initialization."
    exit 0
fi

awslocal s3api create-bucket --bucket "$BUCKET"

awslocal s3api put-public-access-block \
  --bucket "$BUCKET" \
  --public-access-block-configuration \
  BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false

cat > policy.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::desi-wanderer/*"
    }
  ]
}
EOF

awslocal s3api put-bucket-policy \
  --bucket "$BUCKET" \
  --policy file://policy.json

echo "Created S3 Bucket $BUCKET"


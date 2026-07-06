export type DataLocationItem = {
  id: string
  path: string
}

export const DATA_LOCATIONS: DataLocationItem[] = [
  {
    id: "cloudtrail",
    path: "s3://security-lakehouse-prod/aws-cloudtrail/account_id=123456789012/region=us-east-1/year=2026/month=07/day=01/",
  },
  {
    id: "vpc-flow-logs",
    path: "s3://company-siem-ingest-us-west-2/vpc-flow-logs/year=2026/month=07/day=01/hour=12/",
  },
  {
    id: "edr-telemetry",
    path: "s3://secops-data-lake-main/edr-telemetry/crowdstrike/json-raw/year=2026/month=07/day=01/",
  },
  {
    id: "okta-events",
    path: "s3://enterprise-security-audit/okta-identity-events/v1/year=2026/month=07/day=01/",
  },
  {
    id: "github-audit",
    path: "s3://aws-security-data-lake-useast1/ext/github_audit_logs/region=us-east-1/event_day=20260701/",
  },
]

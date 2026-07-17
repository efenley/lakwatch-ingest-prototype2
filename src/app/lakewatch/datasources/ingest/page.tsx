import { IngestSourceSelection } from "./_shared/IngestSourceSelection"
import { INGEST_ROUTES_OPTION1 } from "../_shared/ingest-route-constants"

export default function IngestPage() {
  return (
    <IngestSourceSelection
      baseHref={INGEST_ROUTES_OPTION1.ingestPath}
      configureHref={INGEST_ROUTES_OPTION1.configurePath}
    />
  )
}

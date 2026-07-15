import { IngestSourceSelection } from "../ingest/_shared/IngestSourceSelection"
import { INGEST_ROUTES_OPTION2 } from "../_shared/ingest-route-context"

export default function IngestV2Page() {
  return (
    <IngestSourceSelection
      baseHref={INGEST_ROUTES_OPTION2.ingestPath}
      configureHref={INGEST_ROUTES_OPTION2.configurePath}
    />
  )
}

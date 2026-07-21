import { IngestSourceSelection } from "./_shared/IngestSourceSelection"
import { INGEST_CONFIGURE_PATH, INGEST_PATH } from "./_shared/ingest-routes"

export default function IngestPage() {
  return (
    <IngestSourceSelection
      baseHref={INGEST_PATH}
      configureHref={INGEST_CONFIGURE_PATH}
    />
  )
}

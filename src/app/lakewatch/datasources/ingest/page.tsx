import { IngestSourceSelection } from "./_shared/IngestSourceSelection"
import {
  INGEST_CONFIGURE_PATH,
  INGEST_VARIANT_BASE,
} from "./_shared/ingest-variant"

export default function IngestPage() {
  return (
    <IngestSourceSelection
      baseHref={INGEST_VARIANT_BASE.option1}
      configureHref={INGEST_CONFIGURE_PATH.option1}
    />
  )
}

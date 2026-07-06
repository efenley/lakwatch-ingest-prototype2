import { IngestSourceSelection } from "../ingest/_shared/IngestSourceSelection"
import {
  INGEST_CONFIGURE_PATH,
  INGEST_VARIANT_BASE,
} from "../ingest/_shared/ingest-variant"

export default function IngestV2Page() {
  return (
    <IngestSourceSelection
      baseHref={INGEST_VARIANT_BASE.option2}
      configureHref={INGEST_CONFIGURE_PATH.option2}
    />
  )
}

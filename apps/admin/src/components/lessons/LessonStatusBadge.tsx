import { DraftBadge, PublishedBadge } from "../form/badge";

function LessonStatusBadge({ isPublished = false }) {
	return isPublished ? <PublishedBadge /> : <DraftBadge />;
}

export { LessonStatusBadge };

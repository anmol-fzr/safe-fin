/**
 * Course data type definition
 */
export interface Course {
    /**
     * Unique identifier for the course
     */
    id: string;
    /**
     * Course title
     */
    title: string;
    /**
     * Course instructor/author name
     */
    author: string;
    /**
     * Course description
     */
    description: string;
    /**
     * Difficulty level
     */
    level: "Beginner" | "Intermediate" | "Advanced";
    /**
     * Course duration (e.g., "7h", "4h 30m")
     */
    duration: string;
    /**
     * Course rating (0-5)
     */
    rating: number;
    /**
     * Number of ratings
     */
    ratingCount: number;
    /**
     * Whether the course is bookmarked by the user
     */
    isBookmarked: boolean;
    /**
     * Whether the course is marked as popular
     */
    isPopular?: boolean;
    /**
     * Icon type identifier
     */
    iconType: string;
}

/**
 * Courses data structure
 */
export interface CoursesData {
    courses: Course[];
}

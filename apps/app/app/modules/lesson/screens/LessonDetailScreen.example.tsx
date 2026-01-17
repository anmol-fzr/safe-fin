/**
 * Example Usage of LessonDetailScreen Compound Component
 * 
 * This file demonstrates how to use the refactored LessonDetailScreen
 * with its compound component pattern.
 */

import { LessonDetailScreen, type LessonData } from "./LessonDetailScreen";

// ============================================================================
// Example 1: Full Featured Screen
// ============================================================================

export function ExampleLessonDetailScreen() {
    const lessons: LessonData[] = [
        {
            id: "1",
            title: "Intro to UI Cursors",
            reward: "250 PX",
        },
        {
            id: "2",
            title: "Level Test",
            reward: "500 PX",
        },
    ];

    return (
        <LessonDetailScreen>
            <LessonDetailScreen.Header
                title="UI Components I"
                onBack={() => console.log("Back pressed")}
                onMenu={() => console.log("Menu pressed")}
            />

            <LessonDetailScreen.ScrollView>
                <LessonDetailScreen.Content
                    title="UI Components I"
                    description="Learn to create user-friendly interfaces using core UI components, building a solid foundation for designing intuitive and efficient digital products."
                    level="Intermediate"
                    duration="7h"
                    learners="53153 learners"
                    rating={4.8}
                    ratingCount={8900}
                    updatedDate="Dec 31, 2025"
                    isBookmarked={false}
                    onBookmarkToggle={() => console.log("Bookmark toggled")}
                    onShare={() => console.log("Share pressed")}
                    onStartCourse={() => console.log("Start course pressed")}
                />

                <LessonDetailScreen.Tabs defaultTab="Lessons" tabs={["Lessons", "Overview"]}>
                    <LessonDetailScreen.Lessons
                        lessons={lessons}
                        levelLabel="LEVEL 1"
                        onLessonPress={(id) => console.log("Lesson pressed:", id)}
                    />

                    <LessonDetailScreen.Certificate
                        progress={0}
                        onPress={() => console.log("Start course from certificate")}
                    />
                </LessonDetailScreen.Tabs>
            </LessonDetailScreen.ScrollView>
        </LessonDetailScreen>
    );
}

// ============================================================================
// Example 2: Loading State
// ============================================================================

export function ExampleLessonDetailScreenLoading() {
    return (
        <LessonDetailScreen>
            <LessonDetailScreen.Header.Loading />

            <LessonDetailScreen.ScrollView>
                <LessonDetailScreen.Content.Loading />
                <LessonDetailScreen.Lessons.Loading />
                <LessonDetailScreen.Certificate.Loading />
            </LessonDetailScreen.ScrollView>
        </LessonDetailScreen>
    );
}

// ============================================================================
// Example 3: Custom Layout (Only Lessons, No Certificate)
// ============================================================================

export function ExampleLessonDetailScreenCustom() {
    const lessons: LessonData[] = [
        {
            id: "1",
            title: "Introduction",
            reward: "100 PX",
        },
    ];

    return (
        <LessonDetailScreen>
            <LessonDetailScreen.Header title="Quick Course" />

            <LessonDetailScreen.ScrollView>
                <LessonDetailScreen.Content
                    title="Quick Course"
                    description="A short course"
                    level="Beginner"
                    duration="2h"
                    learners="1000 learners"
                    rating={4.5}
                    ratingCount={100}
                    updatedDate="Jan 14, 2026"
                />

                {/* Only show lessons, no tabs or certificate */}
                <LessonDetailScreen.Lessons
                    lessons={lessons}
                    onLessonPress={(id) => console.log("Lesson:", id)}
                />
            </LessonDetailScreen.ScrollView>
        </LessonDetailScreen>
    );
}

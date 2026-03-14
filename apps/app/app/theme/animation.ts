import {
	type AnimatableValue,
	type AnimationCallback,
	type ComplexAnimationBuilder,
	type WithSpringConfig,
	withSpring,
} from "react-native-reanimated";

export const ANIMATION = {
	spatial: {
		fast: { dampingRatio: 0.6, stiffness: 800 },
		default: { dampingRatio: 0.8, stiffness: 380 }, // The go-to for movement
		slow: { dampingRatio: 0.8, stiffness: 200 },
	},
	effects: {
		fast: { dampingRatio: 1.0, stiffness: 3800 },
		default: { dampingRatio: 1.0, stiffness: 1600 },
		slow: { dampingRatio: 1.0, stiffness: 800 },
	},
} as const;

type ValuesOf<T> = T[keyof T];
type AnimationGroups = ValuesOf<typeof ANIMATION>;
type MotionSpec = ValuesOf<AnimationGroups>;

export const getSpringConfig = (token: MotionSpec) => {
	const { dampingRatio, stiffness } = token;

	const mass = 1.0;
	const damping = dampingRatio * 2 * Math.sqrt(mass * stiffness);

	return {
		mass,
		damping,
		stiffness,
	} as const;
};

export const m3Spring = (
	toValue: AnimatableValue,
	token: MotionSpec,
	cb?: AnimationCallback,
) => {
	const mass = 1.0;

	const damping = token.dampingRatio * 2 * Math.sqrt(mass * token.stiffness);

	const config: WithSpringConfig = {
		mass,
		stiffness: token.stiffness,
		damping,
		overshootClamping: token.dampingRatio >= 1,
	};

	return withSpring(toValue, config, cb);
};

export function makeSpringy(
	baseAnimation: typeof ComplexAnimationBuilder,
	token?: MotionSpec,
) {
	const { damping, mass, stiffness } = getSpringConfig(
		token ?? ANIMATION.spatial.default,
	);

	const springed = baseAnimation
		.springify()
		.damping(damping)
		.stiffness(stiffness)
		.mass(mass);

	return springed;
}

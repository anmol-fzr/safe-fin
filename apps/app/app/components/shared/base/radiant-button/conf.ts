const BORDER_GLOW_SHADER: string = `
  uniform float2 iResolution;
  uniform float progress;
  uniform float borderRadius;
  uniform float borderWidth;
  uniform float bandWidth;
  uniform float3 highlightColor;

  float getPerimeterProgress(float2 pos, float2 size, float r) {
    float2 center = size * 0.5;
    float2 p = pos - center;
    
    float angle = atan(p.y, p.x);
    float normalizedAngle = (angle + 3.14159265) / 6.28318530;
    
    return normalizedAngle;
  }

  float sdRoundedRect(float2 p, float2 b, float r) {
    float2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  half4 main(float2 fragCoord) {
    float2 size = iResolution;
    float2 center = size * 0.5;
    float2 p = fragCoord - center;
    
    float2 halfSize = center - borderWidth;
    float r = max(borderRadius - borderWidth, 0.0);
    
    float distInner = sdRoundedRect(p, halfSize, r);
    
    float distOuter = sdRoundedRect(p, center, borderRadius);
    
    float borderMask = smoothstep(0.0, 1.5, distInner) * (1.0 - smoothstep(-1.5, 0.0, distOuter));
    
    if (borderMask < 0.01) {
      return half4(0.0, 0.0, 0.0, 0.0);
    }
    
    float angle = atan(p.y, p.x);
    float perimProgress = (angle + 3.14159265) / 6.28318530;
    
    float dist = perimProgress - progress;
    
    if (dist > 0.5) dist -= 1.0;
    if (dist < -0.5) dist += 1.0;
    
    dist = abs(dist);
    
    float glow = 1.0 - smoothstep(0.0, bandWidth, dist);
    glow = pow(glow, 1.5); // Sharpen the falloff slightly
    
    float core = 1.0 - smoothstep(0.0, bandWidth * 0.3, dist);
    
    float3 color = mix(highlightColor, float3(1.0, 1.0, 1.0), core * 0.7);
    
    float baseGlow = 0.15;
    float alpha = max(glow, baseGlow) * borderMask;
    
    return half4(color * alpha, alpha);
  }
`;

export { BORDER_GLOW_SHADER };

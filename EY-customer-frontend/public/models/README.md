# 3D Car Model

Place your car GLTF/GLB model file here as `car.glb`.

The CarViewer3D component is configured to load from `/models/car.glb`.

## Model Requirements

- **Format**: GLTF (.gltf) or GLB (.glb)
- **Size**: Recommended < 10MB for optimal loading
- **Parts naming**: For clickable parts detection, name meshes appropriately:
  - Engine parts: Include "engine" or "hood" in mesh name
  - Wheels: Include "wheel" or "tire" and "front"/"rear"
  - Battery: Include "battery" or "power"
  - Brakes: Include "brake"
  - Suspension: Include "suspension"

## Alternative

If no model is available, the component currently displays a placeholder geometry with basic car shape. This is suitable for development and testing.

## Free 3D Model Resources

- [Sketchfab](https://sketchfab.com/)
- [Free3D](https://free3d.com/)
- [TurboSquid](https://www.turbosquid.com/Search/3D-Models/free/car)

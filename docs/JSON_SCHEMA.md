# Formato JSON de niveles

```json
{
  "id": "string",
  "name": "string",
  "width": 20,
  "height": 15,
  "tileSize": 32,
  "player": { "x": 1, "y": 1 },
  "goal": { "x": 18, "y": 13 },
  "walls": [{ "x": 5, "y": 5 }],
  "enemies": [
    {
      "path": [{ "x": 10, "y": 5 }],
      "speed": 1.5
    }
  ]
}
```

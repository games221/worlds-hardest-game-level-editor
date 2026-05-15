# API Reference (Base)

Este documento describe la API pública de cada módulo del editor.  
Todas las funciones están en modo esqueleto y se completarán más adelante.

---

## 📌 gridRenderer.js

Funciones relacionadas con el renderizado del canvas.

### **initGridRenderer(canvas, state)**
Inicializa el renderer y prepara el canvas.

### **renderGrid(state)**
Redibuja la rejilla y las entidades del nivel.

---

## 📌 levelSerializer.js

Funciones para guardar y cargar niveles en formato JSON.

### **serializeLevel(state) → string**
Convierte el estado del editor en un JSON legible.

### **deserializeLevel(jsonString) → state**
Convierte un JSON en un estado válido del editor.

---

## 📌 inputHandler.js

Manejo de mouse y teclado dentro del canvas.

### **attachInputHandlers(canvas, state)**
Registra eventos de clic y teclado.

### **setCurrentTool(toolName)**
Cambia la herramienta activa (player, goal, wall, erase).

---

## 📌 uiPanels.js

Construcción de paneles de interfaz y botones.

### **initUI(state)**
Genera los paneles de herramientas, acciones y validación.

---

## 📌 entityManager.js

Gestión del estado del nivel.

### **createInitialState(config) → state**
Crea un estado inicial de nivel.

### **getState() → state**
Devuelve el estado actual.

### **setState(newState)**
Reemplaza el estado actual por uno nuevo.

---

## 📌 levelValidator.js

Validación de niveles.

### **validateLevel(state) → { valid, errors }**
Comprueba que el nivel sea válido y devuelve errores si existen.

---

## 📌 hooks.js

Hooks para extender el editor sin modificar el core.

### **onLevelLoaded(state)**
Se ejecuta al cargar un nivel.

### **onLevelChanged(state)**
Se ejecuta cuando el usuario modifica el nivel.

### **onBeforeSave(state)**
Se ejecuta antes de guardar/exportar.

### **onAfterSave(state)**
Se ejecuta después de guardar/exportar.

---

## 📌 Estructura del estado

```js
{
  width: number,
  height: number,
  tileSize: number,
  player: { x, y } | null,
  goal: { x, y } | null,
  walls: [{ x, y }],
  enemies: [
    {
      path: [{ x, y }],
      speed: number
    }
  ]
}
```

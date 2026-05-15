# Arquitectura (Base)

El editor se divide en módulos especializados que trabajan juntos:

## 🏗️ Estructura General

```
worlds-hardest-game-level-editor/
├── public/
│   └── index.html          # HTML principal
├── src/
│   ├── main.js             # Punto de entrada
│   ├── styles.css          # Estilos globales
│   └── modules/            # Módulos funcionales
│       ├── gridRenderer.js    # Renderizado del canvas
│       ├── inputHandler.js    # Manejo de entrada (mouse/teclado)
│       ├── uiPanels.js        # Interfaz de usuario
│       ├── entityManager.js   # Gestión del estado
│       ├── levelSerializer.js # Serialización JSON
│       ├── levelValidator.js  # Validación de niveles
│       └── hooks.js           # Hooks para extensiones
├── levels/                 # Niveles de ejemplo
│   └── level_001.json
└── docs/                   # Documentación
```

## 📦 Módulos

### **gridRenderer.js**
- Renderiza la rejilla en el canvas
- Dibuja el jugador, meta, muros y enemigos
- Convierte coordenadas de pantalla a rejilla

### **inputHandler.js**
- Maneja clics del mouse
- Controla la herramienta seleccionada
- Detecta acciones: colocar jugador, meta, muros, enemigos

### **uiPanels.js**
- Crea la interfaz del editor
- Paneles de herramientas, configuración, acciones y validación
- Botones para guardar/cargar niveles

### **entityManager.js**
- Gestiona el estado global del nivel
- Métodos para agregar/remover entidades
- Sincroniza cambios entre módulos

### **levelSerializer.js**
- Serializa el nivel a JSON
- Deserializa JSON a estado
- Exporta/importa niveles

### **levelValidator.js**
- Valida la estructura del nivel
- Comprueba posiciones válidas
- Retorna errores encontrados

### **hooks.js**
- Puntos de extensión para lógica personalizada
- Se ejecutan en momentos clave del ciclo de vida

## 🔄 Flujo de Datos

1. **main.js** inicia todo
2. **gridRenderer** dibuja en el canvas
3. **inputHandler** captura entrada del usuario
4. **entityManager** actualiza el estado
5. **uiPanels** refleja cambios en la UI
6. **levelValidator** comprueba integridad
7. **levelSerializer** exporta/importa datos
8. **hooks** permite extensiones

## 🎮 Herramientas Disponibles

- **⭐ Jugador** - Coloca al jugador
- **🎯 Meta** - Coloca la meta
- **🧱 Muro** - Coloca muros
- **👾 Enemigo** - Crea enemigos con ruta
- **🗑️ Borrar** - Elimina entidades (también con clic derecho)

## 💾 Acciones

- **Guardar JSON** - Exporta el nivel
- **Cargar JSON** - Importa un nivel
- **Nuevo Nivel** - Reinicia
- **Validar Nivel** - Comprueba errores
- **Limpiar Todo** - Borra todo el contenido

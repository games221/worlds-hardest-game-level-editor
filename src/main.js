// main.js
// Inicializador y loop principal del editor

import { initGridRenderer, renderGrid, drawHighlight } from './modules/gridRenderer.js';
import { attachInputHandlers, setCurrentTool } from './modules/inputHandler.js';
import { initUI, showValidationResult, showNotification } from './modules/uiPanels.js';
import { 
  createInitialState, getState, setState, 
  addWall, removeWall, setPlayer, setGoal, clearAll, updateLevelSize 
} from './modules/entityManager.js';
import { serializeLevel, deserializeLevel, downloadLevel, uploadLevel } from './modules/levelSerializer.js';
import { validateLevel } from './modules/levelValidator.js';
import * as hooks from './modules/hooks.js';

class LevelEditor {
  constructor() {
    this.canvas = document.getElementById('editor-canvas');
    this.state = createInitialState();
    this.init();
  }

  init() {
    // Inicializar renderer
    initGridRenderer(this.canvas);
    this.renderFrame();

    // Inicializar UI
    initUI(this.state, this.getUICallbacks());

    // Inicializar input
    attachInputHandlers(this.canvas, this.state, this.getInputCallbacks());

    // Ajustar tamaño del canvas
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Hook de carga
    hooks.onLevelLoaded(this.state);

    console.log('🎮 Level Editor inicializado');
  }

  resizeCanvas() {
    const state = getState();
    this.canvas.width = state.width * state.tileSize;
    this.canvas.height = state.height * state.tileSize;
    this.renderFrame();
  }

  renderFrame() {
    const state = getState();
    renderGrid(state);
  }

  getUICallbacks() {
    return {
      onToolChange: (toolName) => {
        setCurrentTool(toolName);
      },
      onUpdateSize: (width, height) => {
        updateLevelSize(width, height);
        this.resizeCanvas();
      },
      onSaveLevel: () => {
        const state = getState();
        hooks.onBeforeSave(state);
        downloadLevel(state, `level_${Date.now()}.json`);
        hooks.onAfterSave(state);
        showNotification('✅ Nivel guardado', 'success');
      },
      onLoadLevel: async (file) => {
        try {
          const level = await uploadLevel(file);
          setState(level);
          this.resizeCanvas();
          hooks.onLevelLoaded(level);
          showNotification('✅ Nivel cargado', 'success');
        } catch (error) {
          showNotification(`❌ Error: ${error.message}`, 'error');
        }
      },
      onNewLevel: () => {
        const newState = createInitialState({ width: 20, height: 15 });
        setState(newState);
        this.resizeCanvas();
        showNotification('✨ Nuevo nivel creado', 'info');
      },
      onClearAll: () => {
        clearAll();
        this.renderFrame();
        showNotification('🗑️ Todo limpiado', 'info');
      },
      onValidate: () => {
        const state = getState();
        hooks.onValidationStart(state);
        const result = validateLevel(state);
        hooks.onValidationComplete(result);
        showValidationResult(result);
      }
    };
  }

  getInputCallbacks() {
    return {
      onSetPlayer: (x, y) => {
        setPlayer(x, y);
        this.renderFrame();
        hooks.onLevelChanged(getState());
      },
      onSetGoal: (x, y) => {
        setGoal(x, y);
        this.renderFrame();
        hooks.onLevelChanged(getState());
      },
      onAddWall: (x, y) => {
        addWall(x, y);
        this.renderFrame();
        hooks.onLevelChanged(getState());
      },
      onRemoveWall: (x, y) => {
        removeWall(x, y);
        this.renderFrame();
        hooks.onLevelChanged(getState());
      },
      onAddEnemy: (path) => {
        // TODO: Implementar adición de enemigos
      },
      onAddEnemyPoint: (point) => {
        // TODO: Mostrar punto de ruta
      },
      onMouseMove: (pos) => {
        // TODO: Mostrar preview de herramienta
      }
    };
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new LevelEditor();
});

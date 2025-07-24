```markdown
# Desafío Zubale - Mobile Engineer 📱

## 🚀 Sobre el Proyecto

Este proyecto es una aplicación móvil tipo Instagram desarrollada con **React Native** y **Expo** como parte del proceso de selección para la posición de Mobile Engineer en Zubale.

### ✨ Características Principales

- **Feed de Instagram** - Interfaz idéntica a Instagram con posts, likes, comentarios y guardados
- **Stories Interactivas** - Sistema completo de stories con:
  - Barras de progreso animadas
  - Navegación por tap y swipe
  - Estados de visto/no visto
  - Gestos de pausa (long press)
  - Animaciones suaves al abrir/cerrar
- **Arquitectura Modular** - Componentes reutilizables y hooks personalizados
- **Manejo de Estados** - Estados de carga, error y éxito para todas las imágenes
- **Animaciones Fluidas** - Transiciones y gestos como la app nativa
- **Fallbacks Inteligentes** - Imágenes alternativas para URLs rotas

## 🛠 Tecnologías Utilizadas

- **React Native** con **Expo**
- **TypeScript** para type safety
- **Axios** para llamadas a la API
- **Moment.js** para formateo de fechas
- **Animated API** para animaciones nativas
- **React Hooks** personalizados

## 📋 Requerimientos Cumplidos

### ✅ Funcionalidades Base (Requeridas)
- [x] Feed con posts desde API
- [x] Header con avatar y nombre de usuario
- [x] Imagen del post
- [x] Sección de interacciones (like, comentarios, guardado)
- [x] Footer con descripción y fecha formateada
- [x] Manejo de estados de carga y error

### 🎯 Funcionalidades Extra (Agregadas)
- [x] **Sistema completo de Stories**
- [x] **Navegación entre stories con gestos**
- [x] **Estados de visto/no visto**
- [x] **Animaciones avanzadas**
- [x] **Arquitectura modular**
- [x] **Hooks personalizados**


## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn
- Expo CLI
- Expo Go app (para testing en dispositivo)

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/Ignacio1-at/desafio-zubale.git

# Navegar al directorio
cd desafio-zubale

# Instalar dependencias
npm install

# Iniciar la aplicación
npm start
```

### Uso
1. Escanea el código QR con Expo Go
2. La app cargará el feed desde la API
3. Toca cualquier avatar en la sección de stories para ver las stories
4. Navega entre stories tocando los lados o deslizando
5. Mantén presionado para pausar una story

## 📱 Funcionalidades de Stories

### Controles de Navegación
- **Tap izquierdo**: Story anterior
- **Tap derecho**: Story siguiente  
- **Tap centro**: Pausar/Reanudar
- **Long press**: Pausar mientras mantienes presionado
- **Swipe down**: Cerrar stories

### Estados Visuales
- **Borde rosa**: Story no vista
- **Borde gris**: Story ya vista
- **Barras de progreso**: Indican tiempo restante
- **Animaciones**: Transiciones suaves entre stories

## 🎨 Detalles de Implementación

### Manejo de Imágenes
- Fallbacks automáticos para URLs rotas usando Picsum Photos
- Estados de carga con placeholders
- Optimización de memoria con lazy loading

### Animaciones
- `Animated.Value` para transiciones suaves
- `PanResponder` para gestos de swipe
- Interpolaciones para efectos visuales

### Performance
- Componentes memoizados donde es necesario
- Hooks optimizados para evitar re-renders innecesarios
- Manejo eficiente del estado global

## 🧪 Testing

La aplicación ha sido probada en:
- ✅ iOS Simulator
- ✅ Android Emulator  
- ✅ Dispositivos físicos via Expo Go

## 📚 API Utilizada

**Endpoint:** `https://662029f13bf790e070af2cd8.mockapi.io/api/v1/posts`

**Estructura de datos:**
```typescript
interface Post {
  id: string;
  name: string;
  avatar: string;
  image: string;
  description: string;
  likes: number;
  comments: number;
  createdAt: string;
  location: string;
  liked: boolean;
  saved: boolean;
}
```

## 👨‍💻 Desarrollado por

**Ignacio Torres**  
Candidato para Mobile Engineer - Zubale

📧 ignacio.torres.g@mail.pucv.cl  
🔗 [GitHub](https://github.com/Ignacio1-at)

---

## 🎯 Criterios de Evaluación Cumplidos

- ✅ **Legibilidad del código** - Estructura clara y comentarios
- ✅ **Mejores prácticas** - Separación de responsabilidades, componentes reutilizables
- ✅ **Uso correcto de React Native** - Hooks, Animated API, gestos nativos
- ✅ **Uso correcto de Axios** - Manejo de errores y estados de carga
- ✅ **Representación precisa de la UI** - Interfaz idéntica a Instagram
- ✅ **Formateo de fechas con Moment.js** - Fechas relativas ("hace 2 horas")
- ✅ **Funcionalidad completa** - Todas las interacciones funcionando

### 🌟 Valor Agregado
Este proyecto va más allá de los requerimientos básicos, implementando un sistema completo de Stories que demuestra:
- Dominio avanzado de React Native
- Capacidad de crear experiencias de usuario complejas
- Conocimiento profundo de animaciones y gestos
- Arquitectura escalable y mantenible
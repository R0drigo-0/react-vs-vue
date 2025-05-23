<script>
import PasswordGenerator from "./components/PasswordGenerator.vue";
export default {
  name: "App",
  components: {
    PasswordGenerator,
  },
};
</script>

<template>
  <PasswordGenerator />
</template>

<style>
:root {
  --accent: #06b6d4;
  --highlight: #0891b2;
  --border: #e2e8f0;
  --success: #10b981;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@keyframes pulse {
  0% {
    transform: translateY(-50%) scale(1);
  }
  50% {
    transform: translateY(-50%) scale(1.1);
  }
  100% {
    transform: translateY(-50%) scale(1);
  }
}

@keyframes success-border {
  0% {
    border-color: var(--border);
  }
  100% {
    border-color: var(--success);
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15);
  }
}

body {
  background: #f8fafc;
  background-image: radial-gradient(
      circle at 70% 10%,
      #bae6fd 0%,
      transparent 25%
    ),
    radial-gradient(circle at 30% 90%, #e0f2fe 0%, transparent 25%);
  color: #0f172a;
  font-family: system-ui, sans-serif;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.App {
  width: 90%;
  max-width: 450px;
}

.password-generator {
  background: white;
  border-radius: 20px;
  padding: 30px;
  width: 40vw;
  max-width: 23rem;
  min-width: 20rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.03);
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 25px;
  background: linear-gradient(135deg, var(--accent), var(--highlight));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.password-display {
  position: relative;
  margin-bottom: 25px;
}

.password-input {
  width: 13rem !important;
  padding: 15px;
  border: 2px solid var(--border);
  border-radius: 12px;
  font-family: monospace;
  font-size: 1rem;
  transition: all 0.25s;
  overflow: hidden;
  text-overflow: ellipsis;
}

.password-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.15);
  outline: none;
}

.password-input.copied {
  animation: success-border 1.5s forwards;
}

.copy-button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

.copy-button:hover {
  background: var(--highlight);
}
.copy-button.copied {
  background: var(--success);
  animation: pulse 0.75s;
}

.strength-bar {
  height: 8px;
  background: var(--border);
  border-radius: 99px;
  margin: 10px 0 25px;
  overflow: hidden;
}

.strength-value {
  height: 100%;
  transition: width 0.3s, background-color 0.3s;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 25px;
}

.option {
  display: flex;
  align-items: center;
}
label {
  margin-left: 10px;
  font-weight: 500;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
  appearance: none;
  border: 2px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
}

input[type="checkbox"]:checked {
  background: var(--accent);
  border-color: var(--accent);
}

input[type="checkbox"]:checked:after {
  content: "";
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

input[type="range"] {
  width: 100%;
  height: 10px;
  -webkit-appearance: none;
  background: #e2e8f0;
  border-radius: 10px;
  margin: 10px 0;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: white;
  border: 2px solid var(--accent);
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.generate-button {
  width: 100%;
  background: linear-gradient(135deg, var(--accent), var(--highlight));
  color: white;
  border: none;
  border-radius: 12px;
  padding: 15px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(8, 145, 178, 0.2);
}

.generate-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(8, 145, 178, 0.3);
}

@media (max-width: 480px) {
  .password-generator {
    padding: 25px;
  }
  h1 {
    font-size: 1.6rem;
  }
}
</style>

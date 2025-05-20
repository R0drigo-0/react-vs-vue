<script>
export default {
  name: "PasswordGenerator",
  data() {
    return {
      password: "",
      strength: { value: 0, description: "Sin Contraseña" },
      length: 12,
      specialLetters: false,
      uppercase: false,
      lowercase: false,
      numbers: false,
      symbols: false,
    };
  },
  methods: {
    calculateStrength(password) {
      const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
      const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const numbers = "0123456789";
      const badWords = [
        "qwerty",
        "abc123",
        "123abc",
        "welcome",
        "password",
        "jesus",
        "abc",
        "test",
      ];

      let strengthValue = 0;

      if (password.length >= 6 && password.length <= 24) {
        if (password.match(/^[a-zA-Z]+$/) || password.match(/^\d+$/)) {
          strengthValue = -39;
        } else {
          if (password.length < 11) {
            strengthValue = 5;
          } else if (password.length >= 11 && password.length <= 14) {
            strengthValue = 15;
          } else {
            strengthValue = 25;
          }
        }

        if (/[a-z]/.test(password)) strengthValue += 5;
        if (/[A-Z]/.test(password)) strengthValue += 5;
        if (/\d/.test(password)) strengthValue += 5;
        if (/[^a-zA-Z0-9]/.test(password)) strengthValue += 5;
        if (!password.match(/([a-zA-Z0-9])\1{3,}/)) strengthValue += 10;

        const lowerPwd = password.toLowerCase();
        for (let i = 0; i < badWords.length; i++) {
          if (lowerPwd.indexOf(badWords[i]) > -1) {
            strengthValue -= 20;
            break;
          }
        }

        const uniqueChars = new Set(password.split("")).size;
        strengthValue += uniqueChars * 2;
      }

      strengthValue = Math.max(0, Math.min(100, strengthValue));

      let description;
      if (strengthValue <= 20) {
        description = "Débil";
      } else if (strengthValue <= 40) {
        description = "Media";
      } else if (strengthValue <= 60) {
        description = "Buena";
      } else if (strengthValue <= 80) {
        description = "Fuerte";
      } else {
        description = "Excelente";
      }

      return { value: strengthValue, description };
    },

    generatePassword() {
      let charset = "";
      let newPassword = "";

      if (this.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (this.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
      if (this.specialLetters) charset += "áéíóúüñÁÉÍÓÚÜÑçÇàèìòùâêîôû";
      if (this.numbers) charset += "0123456789";
      if (this.symbols) charset += "!@#$%^&*()_+{}[]|:;<>,.?/~";

      if (charset === "") charset = "abcdefghijklmnopqrstuvwxyz";

      for (let i = 0; i < this.length; i++) {
        let min = 0;
        let max = charset.length - 1;
        const randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
        newPassword += charset[randomIndex];
      }
      this.password = newPassword;
      this.strength = this.calculateStrength(newPassword);
    },

    copyToClipboard() {
      if (this.password) {
        navigator.clipboard.writeText(this.password).then(() => {
          alert("Password copied to clipboard!");
        });
      }
    },

      
    handleOptionChange(event) {
      const { name, value, type, checked } = event.target;
      
      if (type === 'checkbox') {
        this[name] = checked;
      } else if (type === 'range') {
        this[name] = parseInt(value);
      } else {
        this[name] = value;
      }
      this.generatePassword();
    }
  },
};
</script>

<template>
  <div class="password-generator">
    <h1>Password Generator</h1>
    <div class="password-display">
      <input
        type="text"
        v-bind:value="password"
        readOnly
        class="password-input"
        placeholder="Your password will appear here"
      />
      <button
        v-on:click="copyToClipboard"
        class="copy-button"
        v-bind:disabled="!password"
      >
        Copy
      </button>
    </div>
    <div class="strength-indicator">
      <div class="strength-label">
        Strength: <span>{{ strength.description }}</span>
      </div>
      <div class="strength-bar">
        <div
          class="strength-value"
          v-bind:style="{
            width: strength.value + '%',
            backgroundColor:
              strength.value > 80
                ? 'green'
                : strength.value > 60
                ? 'yellow'
                : 'red',
          }"
        ></div>
      </div>
    </div>
    <div class="options">
      <div class="option">
        <label>Password Length: {{length}}</label>
        <input 
          type="range" 
          name="length"
          min="8" 
          max="24" 
          v-bind:value="length"
          v-on:input="handleOptionChange"
        />
      </div>
    
      <div class="option">
        <input 
          type="checkbox" 
          name="uppercase"
          v-bind:checked="uppercase"
          v-on:change="handleOptionChange"
          id="uppercase"
        />
        <label for="uppercase">Include Uppercase</label>
      </div>
    
      <div class="option">
        <input 
          type="checkbox" 
          name="lowercase"
          v-bind:checked="lowercase"
          v-on:change="handleOptionChange"
          id="lowercase"
        />
        <label for="lowercase">Include Lowercase</label>
      </div>
    
      <div class="option">
        <input 
          type="checkbox" 
          name="specialLetters"
          v-bind:checked="specialLetters"
          v-on:change="handleOptionChange"
          id="specialLetters"
        />
        <label for="specialLetters">Include Special Letters (áéíóú...)</label>
      </div>
    
      <div class="option">
        <input 
          type="checkbox" 
          name="numbers"
          v-bind:checked="numbers"
          v-on:change="handleOptionChange"
          id="numbers"
        />
        <label for="numbers">Include Numbers</label>
      </div>
    
      <div class="option">
        <input 
          type="checkbox" 
          name="symbols"
          v-bind:checked="symbols"
          v-on:change="handleOptionChange"
          id="symbols"
        />
        <label for="symbols">Include Symbols</label>
      </div>
    </div>
    
    <button 
      v-on:click="generatePassword" 
      class="generate-button"
    >
      Generate Password
    </button>
  </div>
</template>

<style scoped></style>

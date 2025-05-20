import { createContext, useEffect, useState } from "react";

export const PasswordContext = createContext();

export function PasswordProvider({ children }) {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState({
    value: 0,
    description: "Sin Contraseña",
  });
  const [options, setOptions] = useState({
    length: 12,
    specialLetters: false,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  const generatePassword = () => {
    let charset = "";
    let newPassword = "";

    if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (options.specialLetters) charset += "áéíóúüñÁÉÍÓÚÜÑçÇàèìòùâêîôû";
    if (options.numbers) charset += "0123456789";
    if (options.symbols) charset += "!@#$%^&*()_+{}[]|:;<>,.?/~";

    if (charset === "") charset = "abcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < options.length; i++) {
      let min = 0;
      let max = charset.length - 1;
      const randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
    setStrength(calculateStrength(newPassword));
  };

  const calculateStrength = (password) => {
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
  };

  const updateOptions = (options) => {
    setOptions({
      length: options.length,
      specialLetters: options.specialLetters,
      uppercase: options.uppercase,
      lowercase: options.lowercase,
      numbers: options.numbers,
      symbols: options.symbols,
    });
  };

  useEffect(() => {
    generatePassword();
  }, [options]);

  return (
    <PasswordContext.Provider
      value={{
        password,
        strength,
        options,
        generatePassword,
        updateOptions,
        copyToClipboard: () => {
          navigator.clipboard.writeText(password);
        },
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
}

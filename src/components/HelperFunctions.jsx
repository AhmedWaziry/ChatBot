const isemail = (email) => {
  const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  return regex.test(email);
};

export const validate = (values) => {
  if (values[0] === "") {
    return "Name is required";
  } else if (values[1] === "") {
    return "Email is required";
  } else if (values[2] === "") {
    return "Password is required";
  } else if (values[0].length < 6) {
    return "name must be atleast 6 characters";
  } else if (isemail(values[1]) === false) {
    return "invalid email";
  } else if (
    values[2].length < 8 ||
    !values[2].match(/[a-z]/) ||
    !values[2].match(/[0-9]/)
  ) {
    return "password must be atleast 8 characters,contains atleast a number and a letter";
  } else {
    return "success";
  }
};

export const hexToRgb = (hex) => {
  // turn hex color to rgb
  const rgb = hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => "#" + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));
  return {
    r: rgb[0],
    g: rgb[1],
    b: rgb[2],
  };
};

export const calculateLuma = (rgb) => {
  // calculate the perceptive luminance
  // human eye favors green color...
  const luma = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luma;
};

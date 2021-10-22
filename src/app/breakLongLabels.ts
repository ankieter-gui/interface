export let breakLongLabels = (label: string, limit = 3) => {

  const split = label.split(' ');
  const len = split.length;
  let i = 0;
  const out = [];
  while (i < len) {
    if (i % limit == 0 && i != 0 && i != len - 1 && i != len) {
      out.push('\n');
    }
    out.push(split[i]);
    i += 1;
  }
  return out.join(" ")
}

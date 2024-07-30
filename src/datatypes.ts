export type Discrete = string | symbol;
export type Continuous = number;

export type DataRow = Record<string, Discrete | Continuous>;
export type DataTable = DataRow[];

export const inferType = (value: Discrete | Continuous): "discrete" | "continuous" => {
  return typeof value === "number" ? "continuous" : "discrete";
};

// export const inferTypes = (data: DataTable): Record<string, "discrete" | "continuous"> => {
//   const result: Record<string, "discrete" | "continuous"> = {};

//   if (data.length === 0) {
//     return result;
//   }

//   const sample = data[0];

//   for (const key in sample) {
//     if (typeof sample[key] === "number") {
//       result[key] = "continuous";
//     } else {
//       result[key] = "discrete";
//     }
//   }

//   return result;
// };

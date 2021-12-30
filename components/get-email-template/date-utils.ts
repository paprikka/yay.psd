const pad = (n: number): string => n.toString().padStart(2, '0')
export const dateToInputVal = (date: Date) =>
    `${pad(date.getFullYear())}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
    )}`

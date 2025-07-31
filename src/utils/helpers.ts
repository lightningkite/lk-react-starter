import dayjs, {Dayjs} from "dayjs"

export function camelCaseToTitleCase(str: string) {
  return str.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
    return str.toUpperCase()
  })
}

/**
 * Converts a Dayjs to an ISO string.
 * This function corrects for timezones. Do not use `date.toISOString()`.
 */
export function dayjsToISO(date: Dayjs): string {
  const isoString = dayjs(
    date.valueOf() - date.utcOffset() * 60000
  ).toISOString()

  return isoString.split("T")[0]
}

/**
 * Converts an ISO string to a Dayjs.
 * This function corrects for timezones. Do not use `new Date(dateString)`.
 */
export function dayjsFromISO(dateString: string): Dayjs {
  if (dateString.includes("T")) {
    return dayjs(dateString)
  } else {
    const [year, month, day] = dateString.split("-")
    return dayjs(`${year}-${month}-${day}T00:00:00.000${dayjs().format("Z")}`)
  }
}

/**
 * Converts a Date to an ISO string.
 * This function corrects for timezones. Do not use `date.toISOString()`.
 */
export function dateToISO(date: Date): string {
  const isoString = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString()

  return isoString.split("T")[0]
}

/**
 * Converts an ISO string to a Date.
 * This function corrects for timezones. Do not use `new Date(dateString)`.
 */
export function dateFromISO(dateString: string): Date {
  if (dateString.includes("T")) {
    return new Date(dateString)
  } else {
    const [year, month, day] = dateString.split("-")
    return new Date(Number(year), Number(month) - 1, Number(day))
  }
}


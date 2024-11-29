export const formatISOToCustom = (isoString: string) => {
    const date = new Date(isoString)

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const hours = String(date.getUTCHours()).padStart(2, '0')
    const minuts = String(date.getUTCMinutes()).padStart(2, '0')
    const seconds = String(date.getUTCSeconds()).padStart(2, '0')

    const day = date.getUTCDate()
    const month = months[date.getUTCMonth()]
    const year = date.getUTCFullYear()

    return `${hours}:${minuts}:${seconds} ${day} ${month}, ${year}`
}
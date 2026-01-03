export function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

export function formatDate(dateString){
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date)
}

const cleanObject = <T>(obj: T) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value !== undefined)
  )

export default cleanObject

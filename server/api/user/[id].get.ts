export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const base = `https://jsonplaceholder.typicode.com/users/${id}`

  const [user, todos] = await Promise.all([
    $fetch(base),
    $fetch(`${base}/todos`),
  ])

  return { user, todos }
})

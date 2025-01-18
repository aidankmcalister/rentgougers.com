export async function loader(req) {
  if (
    req.headers.get("Authorization") !== `Bearer ${import.meta.env.CRON_SECRET}`
  ) {
    return new Response("Unauthorized", { status: 401 });
  }

  return new Response("Hello Cron!");
}

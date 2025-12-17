export async function onRequest(context) {
    // IF CloudFlare Access is working, only allowed users can even reach this.

    return new Response(
        JSON.stringify({
            ok: true,
            message: "Admin API is reachable.",
            time: new Date().toISOString(),
        }),
        {
            header: { "content-type": "application/json; charset=utf-8" },
        }
    );
}
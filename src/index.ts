// import app from "@/2_short_polling/index"
// import app from "@/3_long_polling/index"
import app from "@/4_server_sent_events/index"

import { env } from "@/env/module"

app.listen(env.PORT, ()=> console.log(`listening on ${env.PORT}`))

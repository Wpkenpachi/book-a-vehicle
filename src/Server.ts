import Api from "./infra/http/Api";

Api.listen(3000, () => console.log('running at port 3000'));
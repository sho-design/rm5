import { topicRoute } from "@/lib/topic-route";

const route = topicRoute("pain");

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;

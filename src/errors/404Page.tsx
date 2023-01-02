import { Link, useLocation } from "@solidjs/router";

export default function _404Page() {
  const location = useLocation();
  return (
    <div class="flex-col text-center">
      <div>{`路由 ${location.pathname} 不存在`}</div>
      <Link href="/">回到首页</Link>
    </div>
  );
}

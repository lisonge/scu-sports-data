import QuestionCard from "@/components/QuestionCard";
import { getCombineCourse } from "@/config";
import type { Paper } from "@/types";
import { useParams } from "@solidjs/router";
import { createSignal, For, Show } from "solid-js";

export default function PaperPreview() {
  const params = useParams<{ id: string; hash: string }>();
  const [paper, setPaper] = createSignal<Paper>();
  (async () => {
    const course = await getCombineCourse(params.id);
    const paper2 = course.papers.find((p) => p.hash == params.hash);
    if (!paper2) {
      return;
    }
    setPaper(paper2);
  })();
  return (
    <Show when={paper()} fallback={<div class="text-center">加载中</div>}>
      <div class="p-20px flex flex-col min-h-screen">
        <div>{[paper().name, paper().id, paper().hash].join("\x20")}</div>
        <div class="mt-4px flex flex-col gap-4px">
          <For each={paper().topics}>
            {(q) => {
              return <QuestionCard question={q} />;
            }}
          </For>
        </div>
      </div>
    </Show>
  );
}

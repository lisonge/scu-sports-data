import type { CombineCourse, Paper, Question } from "@/types";
import { For, Show } from "solid-js";
import type { ComponentProps } from "solid-js";
import { type2name } from "@/config";

export type QuestionCardProps = ComponentProps<"div"> & {
  question: Question;
  paper?: Paper;
  onPreviewPaper?: () => void;
};
export default function QuestionCard(props: QuestionCardProps) {
  return (
    <div
      {...props}
      class={
        `p-8px border-black border-1px border-style-solid flex flex-col ` +
        (props.class ?? ``)
      }
    >
      <div class="flex gap-4px">
        <Show when={props.paper}>
          <div
            class="cursor-pointer border-1px border-style-solid border-indigo"
            onClick={props.onPreviewPaper}
          >
            查看试卷
          </div>
        </Show>
        <Show when={props.paper}>
          <div>{props.paper.name}</div>
        </Show>
        <div
          class="whitespace-nowrap"
          classList={
            {
              // "bg-gray": props.question.type == 1,
              // "bg-red": props.question.type == 2,
              // "bg-cyan": props.question.type == 3,
            }
          }
        >
          {type2name[props.question.type]}
        </div>
        <div>{props.question.index}</div>
      </div>
      <div class="mt-4px">{props.question.info}</div>
      <Show when={props.question.type != 1}>
        <div class="mt-4px">
          <For each={props.question.options}>
            {(option, index) => {
              const correct = !props.question.solutions.includes(index());
              return (
                <div
                  classList={{
                    "decoration-line-through": correct,
                    "opacity-40": correct,
                  }}
                >
                  {`${[`A`, `B`, `C`, `D`][index()]} : ${option}`}
                </div>
              );
            }}
          </For>
        </div>
      </Show>
      <div class="mt-4px">
        {props.question.type == 1
          ? `${props.question.options[props.question.solutions[0]]}`
          : `正确答案 : ${props.question.solutions
              .map((s) => [`A`, `B`, `C`, `D`][s])
              .join(`,`)}`}
      </div>
    </div>
  );
}

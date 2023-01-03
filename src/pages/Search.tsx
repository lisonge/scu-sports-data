import QuestionCard from "@/components/QuestionCard";
import { getCombineCourse, id2name, ids, type2name } from "@/config";
import type { CombineCourse, Paper, Question } from "@/types";
import { createCacheStore } from "@/utils";
import { useNavigate } from "@solidjs/router";
import { For } from "solid-js";

const createCacheSignal = createCacheStore();
export default function Search() {
  const navigate = useNavigate();
  const [value, setValue] = createCacheSignal(``);
  const [searchWord, setSearchWord] = createCacheSignal(``);
  const [unSelectedIdObj, setUnselectedIdObj] = createCacheSignal<
    Record<string, unknown>
  >({});
  const [unSelectedIndexObj, setUnselectedIndexObj] = createCacheSignal<
    Record<string, unknown>
  >({});
  const [unSelectedTypeObj, setUnselectedTypeObj] = createCacheSignal<
    Record<string, unknown>
  >({});
  const [courses, setCourses] = createCacheSignal<CombineCourse[]>([]);
  (async () => {
    if (courses().length > 0) {
      return;
    }
    ids.forEach(async (id) => {
      const data = await getCombineCourse(id);
      setCourses((d) => {
        return [...d, data];
      });
    });
  })();

  const searchQuestionsFn = () => {
    const word = searchWord().trim();
    const list: { question: Question; paper: Paper }[] = [];
    let count = 0;
    if (word.length == 0) {
      return { list, count };
    }
    courses()
      .filter((c) => !unSelectedIdObj()[c.id])
      .forEach((c) => {
        c.papers.forEach((p) => {
          p.topics
            .filter(
              (t) =>
                !unSelectedIndexObj()[t.index] && !unSelectedTypeObj()[t.type]
            )
            .forEach((t) => {
              if (t.info.includes(word)) {
                if (list.length < 100) {
                  list.push({ question: t, paper: p });
                }
                count++;
              }
            });
        });
      });
    return { list, count };
  };

  return (
    <div class="p-20px flex flex-col">
      <div class="text-20px flex items-center">
        <input
          type="text"
          value={value()}
          onInput={(() => {
            // const updateSearchWord = debounce((v: string) => {
            //   setSearchWord(v);
            // }, 500);
            return (e) => {
              const v = e.currentTarget.value;
              setValue(v);
              // updateSearchWord(v);
            };
          })()}
          onKeyDown={(e) => {
            if (e.key == `Enter`) {
              setSearchWord(value());
            }
          }}
        />
        <div
          class="ml-8px p-2px text-18px cursor-pointer select-none border-1px border-style-solid"
          onClick={() => {
            setSearchWord(value());
          }}
        >
          搜索
        </div>
      </div>

      <div class="mt-6px">请选择可搜索题目类型</div>
      <div class="flex flex-wrap mt-4px mb-4px gap-10px">
        <For each={Object.entries(type2name)}>
          {([type, name]) => {
            return (
              <div
                class="p-4px cursor-pointer select-none border-blue border-1px border-style-solid whitespace-nowrap"
                classList={{
                  "bg-blue": !unSelectedTypeObj()[type],
                }}
                onClick={() => {
                  setUnselectedTypeObj((d) => ({
                    ...d,
                    [type]: !d[type],
                  }));
                }}
              >
                {name}
              </div>
            );
          }}
        </For>
      </div>

      <div class="mt-6px">请选择可搜索科目</div>
      <div class="flex flex-wrap mt-4px mb-4px gap-10px">
        <For each={Object.entries(id2name)}>
          {([id, name]) => {
            return (
              <div
                class="p-4px cursor-pointer select-none border-blue border-1px border-style-solid whitespace-nowrap"
                classList={{
                  "bg-blue": !unSelectedIdObj()[id],
                }}
                onClick={() => {
                  setUnselectedIdObj((d) => ({
                    ...d,
                    [id]: !d[id],
                  }));
                }}
              >
                {name}
              </div>
            );
          }}
        </For>
      </div>

      <div class="mt-6px">请选择可搜索题号</div>
      <div class="flex flex-wrap mt-8px mb-8px gap-10px">
        <For
          each={Array<number>(50)
            .fill(0)
            .map((_, i) => i + 1)}
        >
          {(i) => {
            return (
              <div
                class="p-4px cursor-pointer select-none border-blue border-1px border-style-solid whitespace-nowrap "
                classList={{
                  "bg-blue": !unSelectedIndexObj()[i],
                }}
                onClick={() => {
                  setUnselectedIndexObj((d) => ({
                    ...d,
                    [i]: !d[i],
                  }));
                }}
              >
                {i}
              </div>
            );
          }}
        </For>
      </div>
      <div
        classList={{
          invisible: searchWord().length == 0,
        }}
      >{`共搜索到 ${searchQuestionsFn().count} 条结果${
        searchQuestionsFn().count == searchQuestionsFn().list.length
          ? ``
          : `, 仅显示前 ${searchQuestionsFn().list.length} 条`
      }`}</div>
      <div>
        <For each={searchQuestionsFn().list}>
          {(q) => {
            return (
              <QuestionCard
                question={q.question}
                paper={q.paper}
                class="mt-4px"
                onPreviewPaper={() => {
                  navigate(`/paper-preview/${q.paper.id}/${q.paper.hash}`);
                }}
              />
            );
          }}
        </For>
      </div>
    </div>
  );
}

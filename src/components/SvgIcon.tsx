import type { Component, ComponentProps } from "solid-js";
import { Dynamic } from "solid-js/web";
type SvgComponent = Component<ComponentProps<"svg">>;

const modules = import.meta.glob<SvgComponent>("../assets/svg/*.svg", {
  eager: true,
  query: `component`,
  import: "default",
});

const name2component: Record<string, SvgComponent> = {};
for (const path in modules) {
  let name = path.split("/").at(-1);
  name = name.substring(0, name.length - ".svg".length);
  name2component[name] = modules[path];
}

export type SvgIconProps = ComponentProps<"svg"> & {
  name: string;
};

export default function SvgIcon(props: SvgIconProps) {
  const component = (): SvgComponent => {
    const Cpt = name2component[props.name];
    if (!Cpt) {
      console.error(`SvgIcon: not found name=${props.name}`);
      return (props: SvgIconProps) => {
        return (
          <svg
            viewBox="0 0 1 1"
            width="1px"
            height="1px"
            data-error={`not found name=${props.name}`}
            {...props}
          ></svg>
        );
      };
    }
    return (props: SvgIconProps) => {
      return <Cpt {...props}></Cpt>;
    };
  };
  return <Dynamic {...props} component={component()}></Dynamic>;
}

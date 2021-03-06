import * as React from "react";
import { GroupOptions, GroupHTMLProps, useGroup } from "../Group/Group";
import { unstable_useOptions } from "../system/useOptions";
import { unstable_useProps } from "../system/useProps";
import { unstable_mergeProps } from "../utils/mergeProps";
import { As, PropsWithAs, Keys } from "../__utils/types";
import { unstable_createComponent } from "../utils/createComponent";
import { DeepPath } from "./__utils/types";
import { getInputId } from "./__utils/getInputId";
import { getMessageId } from "./__utils/getMessageId";
import { getLabelId } from "./__utils/getLabelId";
import { shouldShowError } from "./__utils/shouldShowError";
import { unstable_FormStateReturn, unstable_useFormState } from "./FormState";

export type unstable_FormGroupOptions<
  V,
  P extends DeepPath<V, P>
> = GroupOptions &
  Pick<unstable_FormStateReturn<V>, "baseId" | "touched" | "errors"> & {
    /**
     * FormGroup's name as in form values.
     */
    name: P;
  };

export type unstable_FormGroupHTMLProps = GroupHTMLProps &
  React.FieldsetHTMLAttributes<any>;

export type unstable_FormGroupProps<
  V,
  P extends DeepPath<V, P>
> = unstable_FormGroupOptions<V, P> & unstable_FormGroupHTMLProps;

export function unstable_useFormGroup<V, P extends DeepPath<V, P>>(
  options: unstable_FormGroupOptions<V, P>,
  htmlProps: unstable_FormGroupHTMLProps = {}
) {
  options = unstable_useOptions("FormGroup", options, htmlProps);
  htmlProps = unstable_mergeProps(
    {
      id: getInputId(options.name, options.baseId),
      "aria-describedby": getMessageId(options.name, options.baseId),
      "aria-labelledby": getLabelId(options.name, options.baseId),
      "aria-invalid": shouldShowError(options, options.name)
    } as unstable_FormGroupHTMLProps,
    htmlProps
  );

  htmlProps = unstable_useProps("FormGroup", options, htmlProps);
  htmlProps = useGroup(options, htmlProps);
  return htmlProps;
}

const keys: Keys<
  unstable_FormStateReturn<any> & unstable_FormGroupOptions<any, any>
> = [...useGroup.__keys, ...unstable_useFormState.__keys, "name"];

unstable_useFormGroup.__keys = keys;

export const unstable_FormGroup = (unstable_createComponent({
  as: "fieldset",
  useHook: unstable_useFormGroup
}) as unknown) as <V, P extends DeepPath<V, P>, T extends As = "fieldset">(
  props: PropsWithAs<unstable_FormGroupOptions<V, P>, T>
) => JSX.Element;

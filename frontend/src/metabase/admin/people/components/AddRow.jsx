/* eslint-disable react/prop-types */
import React from "react";
import { t } from "ttag";
import cx from "classnames";

export default function AddRow({
  value,
  isValid,
  placeholder,
  onKeyDown,
  onChange,
  onDone,
  onCancel,
  children,
}) {
  return (
    <div className="my2 pl1 p1 bordered border-brand rounded relative flex align-center">
      {children}
      <input
        className="input--borderless h3 ml1 flex-full"
        type="text"
        value={value}
        placeholder={placeholder}
        autoFocus
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
      <span className="link no-decoration cursor-pointer" onClick={onCancel}>
        {t`Cancel`}
      </span>
      <button
        className={cx("Button ml2", { "Button--primary": !!isValid })}
        disabled={!isValid}
        onClick={onDone}
      >
        {t`Add`}
      </button>
    </div>
  );
}

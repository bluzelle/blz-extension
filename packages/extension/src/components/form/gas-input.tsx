import React, { FunctionComponent, useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { IGasConfig } from "@keplr-wallet/hooks";
import { observer } from "mobx-react-lite";

export interface GasInputProps {
  gasConfig: IGasConfig;

  label?: string;
  className?: string;
}

// TODO: Handle the max block gas limit(?)
export const GasInput: FunctionComponent<GasInputProps> = observer(
  ({ gasConfig, label, className }) => {
    const [inputId] = useState(() => {
      const bytes = new Uint8Array(4);
      crypto.getRandomValues(bytes);
      return `input-${Buffer.from(bytes).toString("hex")}`;
    });

    return (
      <FormGroup className={className}>
        {label ? (
          <Label
            for={inputId}
            className="form-control-label"
            style={{ color: "#00ffff" }}
          >
            {label}
          </Label>
        ) : null}
        <Input
          style={{
            color: "#00ffff",
            background: "#0d071d",
            border: "1px solid #f0f",
          }}
          id={inputId}
          className="form-control-alternative"
          type="number"
          step={1}
          min={0}
          value={gasConfig.gas}
          onChange={(e) => {
            const gas = parseInt(e.target.value);
            if (!isNaN(gas) && gas > 0) {
              gasConfig.setGas(gas);
            }
            e.preventDefault();
          }}
          autoComplete="off"
        />
      </FormGroup>
    );
  }
);

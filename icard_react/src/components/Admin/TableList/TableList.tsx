import { useState, useEffect } from "react";
import { Button, Icon, Checkbox } from "semantic-ui-react";
import { map } from "lodash";

import { Table } from "..";
import "./TableList.scss";

interface Props {
  tables: Table[];
}

export const TableList = ({ tables }: Props) => {
  const [refresh, setRefresh] = useState(false);
  const [autoReload, setAutoReload] = useState(false);

  const onRefresh = () => {
    setRefresh((prevState) => !prevState);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined = undefined;
    if (autoReload) {
      const autoReloadAction = () => {
        onRefresh();
        timeout = setTimeout(() => {
          autoReloadAction();
        }, 5000);
      };
      autoReloadAction();
    } else {
      clearTimeout(timeout);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [autoReload]);

  const onCheckAutoReload = (check: any) => {
    setAutoReload(check);
  };

  return (
    <div className="table-list-admin">
      <Button
        primary
        icon
        onClick={onRefresh}
        className="table-list-admin__refresh"
      >
        <Icon name="refresh" />
      </Button>
      <div className="table-list-admin__reload-toggle">
        <span>Reload Automático</span>
        <Checkbox
          toggle
          checked={autoReload}
          onChange={(_, data) => onCheckAutoReload(data.checked)}
        />
      </div>
      {map(tables, (table) => (
        <Table key={table.number} table={table} refresh={refresh} />
      ))}
    </div>
  );
};

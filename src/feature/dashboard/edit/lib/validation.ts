import { AggregatedData, GroupData } from "@/stores/dashboardStore";

export const isAllFieldsFilled = (groupItems: GroupData[], aggregatedItems: AggregatedData[]): boolean => {
  if (groupItems.length === 0 || aggregatedItems.length === 0) {
    return false;
  }

  const isGroupValid = groupItems.every((item) => item.groupId && item.databaseColumn && item.databaseColumnAlias && item.data);

  const isAggregatedValid = aggregatedItems.every(
    (item) => item.aggregatedId && item.aggregatedDatabaseColumn && item.dataType && item.databaseColumnAlias && item.dashboardCondition && item.conditionValue && item.statMethod
  );

  return isGroupValid && isAggregatedValid;
};

export const createDashboardDetailInfo = (groupItems: GroupData[], aggregatedItems: AggregatedData[]) => {
  const groupData = groupItems.map((item) => ({
    groupId: item.groupId,
    databaseColumn: item.databaseColumn,
    databaseColumnAlias: item.databaseColumnAlias,
    data: item.data,
  }));

  const aggregatedData = aggregatedItems.map((item) => ({
    aggregatedId: item.aggregatedId,
    aggregatedDatabaseColumn: item.aggregatedDatabaseColumn,
    dataType: item.dataType,
    databaseColumnAlias: item.databaseColumnAlias,
    dashboardCondition: item.dashboardCondition,
    conditionValue: item.conditionValue,
    statMethod: item.statMethod,
  }));

  return { groupData, aggregatedData };
};

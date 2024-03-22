import React from "react";
import { Table } from "antd";

const PeriodDetail = [
  {
    key: 1,
    report_date: "2024-02-23",
    total: {
      total_actual: {
        count: 18,
        percentage_count: 100,
        sales: 7750000,
        percentage_sales: 100,
      },
      adults_actual: {
        count: 16,
        percentage_count: 89,
        sales: 7750000,
        percentage_sales: 100,
      },
      children_actual: {
        count: 2,
        percentage_count: 11,
        sales: 0,
        percentage_sales: 0,
      },
    },
  },
];
export default function NestedTable() {
  const columns = [
    {
      title: "Report Date",
      dataIndex: "report_date",
      key: "report_date",
    },
    {
      title: "Total Actual Count",
      dataIndex: "total.total_actual.count",
      key: "total_actual_count",
    },
    {
      title: "Total Actual % Count",
      dataIndex: "total.total_actual.percentage_count",
      key: "total_actual_count",
    },
    {
      title: "Total Actual Sales",
      dataIndex: "total.total_actual.sales",
      key: "total_actual_sales",
    },
    {
      title: "Adults Actual Count",
      dataIndex: "total.adults_actual.count",
      key: "adults_actual_count",
    },
    {
      title: "Adults Actual % Count",
      dataIndex: "total.adults_actual.percentage_count",
      key: "total_actual_count",
    },
    {
      title: "Adults Actual Sales",
      dataIndex: "total.adults_actual.sales",
      key: "adults_actual_sales",
    },
    {
      title: "Children Actual Count",
      dataIndex: "total.children_actual.count",
      key: "children_actual_count",
    },
    {
      title: "Children Actual % Count",
      dataIndex: "total.children_actual.percentage_count",
      key: "total_actual_count",
    },
    {
      title: "Children Actual Sales",
      dataIndex: "total.children_actual.sales",
      key: "children_actual_sales",
    },
  ];

  const data = PeriodDetail.map((item) => ({
    key: item.key,
    report_date: item.report_date,
    "total.total_actual.count": item.total.total_actual.count,
    "total.total_actual.percentage_count": item.total.total_actual.percentage_count,
    "total.total_actual.sales": item.total.total_actual.sales,
    "total.adults_actual.count": item.total.adults_actual.count,
    "total.adults_actual.percentage_count": item.total.adults_actual.percentage_count,
    "total.adults_actual.sales": item.total.adults_actual.sales,
    "total.children_actual.count": item.total.children_actual.count,
    "total.children_actual.percentage_count": item.total.children_actual.percentage_count,
    "total.children_actual.sales": item.total.children_actual.sales,
  }));
  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}

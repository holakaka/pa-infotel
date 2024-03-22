export interface IPeriodDetailItem {
  key: React.ReactNode;
  report_date: string;
  total: {
    total_actual: DetailItem;
    adults_actual: DetailItem;
    children_actual: DetailItem;
  };
  outlet: OutletItem[];
}

export interface DetailItem {
  count: number;
  percentage_count: number;
  sales: number;
  percentage_sales: number;
}

export interface OutletItem {
  outlet_code: string;
  outlet_name: string;
  total: {
    total_actual: DetailItem;
    adults_actual: DetailItem;
    children_actual: DetailItem;
  };
  breakfast: MealItem;
  lunch: MealItem;
  dinner: MealItem;
}

export interface MealItem {
  total: {
    total_actual: DetailItem;
    adults_actual: DetailItem;
    children_actual: DetailItem;
  };
  records: Record<string, MealRecord>;
}

export interface MealRecord {
  room: string;
  guest_names: string;
  package_code: string;
  count: number;
  pax: string;
  remark: string;
}

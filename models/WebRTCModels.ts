export interface OfferCallPayload {
  partner_id: number;
  customer_email: string;
  offer_payload: any;
}

export interface HangupCallPayload {
  partner_id: number;
  customer_email: string;
}

export interface PollAnswerPayload {
  partner_id: number;
  customer_email: string;
  webrtc_uuid: string;
}

export interface SendIcePayload {
  webrtc_uuid: string;
  type?: string;
  ice_payload: any;
}

export interface CallItem {
  partner_id: number;
  customer_email: string;
  webrtc_uuid: string;
  timestamp: number;
}

export interface WebrtcPayloadItem {
  payload: any;
  payload_ttl: number;
  timestamp: number;
  type: string;
  webrtc_uuid: string;
}

export interface ProductItem {
  partner_product_id: number;
  updated_by: number;
  updated_on: string;
  product_description: string;
  product_unit: number;
  product_quantity: number;
  product_rating?: any;
  packaged_product: boolean;
  product_mrp: number;
  product_selling_price: number;
  product_discount: number;
  stock_quantity: number;
  product_thumbnail: string;
  unit_name?: string;
  unit_short?: string;
  brand_created_by_role: number;
  product_brand_id: number;
  brand_name: string;
  subcategory_name: string;
  stock_statement: string;
  product_title: string;
  category_name: string;
  bucket_name: string;
  folder_name: string;
  store_category: number;
}

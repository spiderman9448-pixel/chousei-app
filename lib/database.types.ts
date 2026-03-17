export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          created_at?: string;
        };
      };
      date_options: {
        Row: {
          id: string;
          event_id: string;
          label: string;
          sort_order: number;
        };
        Insert: {
          id?: string;
          event_id: string;
          label: string;
          sort_order: number;
        };
        Update: {
          id?: string;
          event_id?: string;
          label?: string;
          sort_order?: number;
        };
      };
      responses: {
        Row: {
          id: string;
          event_id: string;
          name: string;
          comment: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          name: string;
          comment?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          name?: string;
          comment?: string | null;
          created_at?: string;
        };
      };
      response_items: {
        Row: {
          id: string;
          response_id: string;
          date_option_id: string;
          availability: string;
        };
        Insert: {
          id?: string;
          response_id: string;
          date_option_id: string;
          availability: string;
        };
        Update: {
          id?: string;
          response_id?: string;
          date_option_id?: string;
          availability?: string;
        };
      };
    };
  };
}

// 便利な型エイリアス
export type Event = Database["public"]["Tables"]["events"]["Row"];
export type DateOption = Database["public"]["Tables"]["date_options"]["Row"];
export type Response = Database["public"]["Tables"]["responses"]["Row"];
export type ResponseItem = Database["public"]["Tables"]["response_items"]["Row"];

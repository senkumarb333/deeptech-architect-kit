export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          business_owner: string | null
          capability_id: string | null
          category: string | null
          code: string | null
          cost_annual: number | null
          created_at: string
          created_by: string | null
          criticality: Database["public"]["Enums"]["criticality"]
          description: string | null
          id: string
          lifecycle: Database["public"]["Enums"]["lifecycle_status"]
          name: string
          tags: string[] | null
          technical_owner: string | null
          technology: string[] | null
          tenant_id: string
          updated_at: string
          updated_by: string | null
          users_count: number | null
          vendor: string | null
        }
        Insert: {
          business_owner?: string | null
          capability_id?: string | null
          category?: string | null
          code?: string | null
          cost_annual?: number | null
          created_at?: string
          created_by?: string | null
          criticality?: Database["public"]["Enums"]["criticality"]
          description?: string | null
          id?: string
          lifecycle?: Database["public"]["Enums"]["lifecycle_status"]
          name: string
          tags?: string[] | null
          technical_owner?: string | null
          technology?: string[] | null
          tenant_id: string
          updated_at?: string
          updated_by?: string | null
          users_count?: number | null
          vendor?: string | null
        }
        Update: {
          business_owner?: string | null
          capability_id?: string | null
          category?: string | null
          code?: string | null
          cost_annual?: number | null
          created_at?: string
          created_by?: string | null
          criticality?: Database["public"]["Enums"]["criticality"]
          description?: string | null
          id?: string
          lifecycle?: Database["public"]["Enums"]["lifecycle_status"]
          name?: string
          tags?: string[] | null
          technical_owner?: string | null
          technology?: string[] | null
          tenant_id?: string
          updated_at?: string
          updated_by?: string | null
          users_count?: number | null
          vendor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_capability_id_fkey"
            columns: ["capability_id"]
            isOneToOne: false
            referencedRelation: "capabilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      architecture_decisions: {
        Row: {
          consequences: string | null
          context: string | null
          created_at: string
          created_by: string | null
          decision: string | null
          id: string
          status: Database["public"]["Enums"]["adr_status"]
          supersedes: string | null
          tags: string[] | null
          tenant_id: string
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          consequences?: string | null
          context?: string | null
          created_at?: string
          created_by?: string | null
          decision?: string | null
          id?: string
          status?: Database["public"]["Enums"]["adr_status"]
          supersedes?: string | null
          tags?: string[] | null
          tenant_id: string
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          consequences?: string | null
          context?: string | null
          created_at?: string
          created_by?: string | null
          decision?: string | null
          id?: string
          status?: Database["public"]["Enums"]["adr_status"]
          supersedes?: string | null
          tags?: string[] | null
          tenant_id?: string
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "architecture_decisions_supersedes_fkey"
            columns: ["supersedes"]
            isOneToOne: false
            referencedRelation: "architecture_decisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "architecture_decisions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          actor: string | null
          at: string
          diff: Json | null
          entity: string
          entity_id: string | null
          id: number
          tenant_id: string | null
        }
        Insert: {
          action: string
          actor?: string | null
          at?: string
          diff?: Json | null
          entity: string
          entity_id?: string | null
          id?: number
          tenant_id?: string | null
        }
        Update: {
          action?: string
          actor?: string | null
          at?: string
          diff?: Json | null
          entity?: string
          entity_id?: string | null
          id?: number
          tenant_id?: string | null
        }
        Relationships: []
      }
      capabilities: {
        Row: {
          code: string | null
          created_at: string
          created_by: string | null
          criticality: Database["public"]["Enums"]["criticality"]
          description: string | null
          id: string
          level: number
          lifecycle: Database["public"]["Enums"]["lifecycle_status"]
          name: string
          owner: string | null
          parent_id: string | null
          tags: string[] | null
          tenant_id: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          created_by?: string | null
          criticality?: Database["public"]["Enums"]["criticality"]
          description?: string | null
          id?: string
          level?: number
          lifecycle?: Database["public"]["Enums"]["lifecycle_status"]
          name: string
          owner?: string | null
          parent_id?: string | null
          tags?: string[] | null
          tenant_id: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string
          created_by?: string | null
          criticality?: Database["public"]["Enums"]["criticality"]
          description?: string | null
          id?: string
          level?: number
          lifecycle?: Database["public"]["Enums"]["lifecycle_status"]
          name?: string
          owner?: string | null
          parent_id?: string | null
          tags?: string[] | null
          tenant_id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "capabilities_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "capabilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "capabilities_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          body: string | null
          created_at: string
          created_by: string | null
          id: string
          kind: string | null
          tags: string[] | null
          tenant_id: string
          title: string
          updated_at: string
          updated_by: string | null
          url: string | null
        }
        Insert: {
          body?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          kind?: string | null
          tags?: string[] | null
          tenant_id: string
          title: string
          updated_at?: string
          updated_by?: string | null
          url?: string | null
        }
        Update: {
          body?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          kind?: string | null
          tags?: string[] | null
          tenant_id?: string
          title?: string
          updated_at?: string
          updated_by?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      risks: {
        Row: {
          application_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          impact: number
          likelihood: number
          mitigation: string | null
          owner: string | null
          status: Database["public"]["Enums"]["risk_status"]
          tenant_id: string
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          application_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          impact?: number
          likelihood?: number
          mitigation?: string | null
          owner?: string | null
          status?: Database["public"]["Enums"]["risk_status"]
          tenant_id: string
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          application_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          impact?: number
          likelihood?: number
          mitigation?: string | null
          owner?: string | null
          status?: Database["public"]["Enums"]["risk_status"]
          tenant_id?: string
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "risks_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "risks_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          application_id: string | null
          created_at: string
          created_by: string | null
          criticality: Database["public"]["Enums"]["criticality"]
          description: string | null
          id: string
          kind: string | null
          lifecycle: Database["public"]["Enums"]["lifecycle_status"]
          name: string
          tags: string[] | null
          tenant_id: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          application_id?: string | null
          created_at?: string
          created_by?: string | null
          criticality?: Database["public"]["Enums"]["criticality"]
          description?: string | null
          id?: string
          kind?: string | null
          lifecycle?: Database["public"]["Enums"]["lifecycle_status"]
          name: string
          tags?: string[] | null
          tenant_id: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          application_id?: string | null
          created_at?: string
          created_by?: string | null
          criticality?: Database["public"]["Enums"]["criticality"]
          description?: string | null
          id?: string
          kind?: string | null
          lifecycle?: Database["public"]["Enums"]["lifecycle_status"]
          name?: string
          tags?: string[] | null
          tenant_id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_members: {
        Row: {
          created_at: string
          id: string
          tenant_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          tenant_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          tenant_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_members_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          tenant_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          tenant_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          tenant_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_write_tenant: {
        Args: { _tenant: string; _user: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _tenant: string
          _user: string
        }
        Returns: boolean
      }
      is_tenant_member: {
        Args: { _tenant: string; _user: string }
        Returns: boolean
      }
    }
    Enums: {
      adr_status: "draft" | "proposed" | "accepted" | "rejected" | "superseded"
      app_role:
        | "super_admin"
        | "enterprise_admin"
        | "architect"
        | "reviewer"
        | "developer"
        | "analyst"
        | "viewer"
      criticality: "low" | "medium" | "high" | "critical"
      lifecycle_status:
        | "proposed"
        | "planned"
        | "active"
        | "deprecated"
        | "retired"
      risk_status: "open" | "mitigating" | "accepted" | "closed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      adr_status: ["draft", "proposed", "accepted", "rejected", "superseded"],
      app_role: [
        "super_admin",
        "enterprise_admin",
        "architect",
        "reviewer",
        "developer",
        "analyst",
        "viewer",
      ],
      criticality: ["low", "medium", "high", "critical"],
      lifecycle_status: [
        "proposed",
        "planned",
        "active",
        "deprecated",
        "retired",
      ],
      risk_status: ["open", "mitigating", "accepted", "closed"],
    },
  },
} as const

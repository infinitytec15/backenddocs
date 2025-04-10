import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  Rocket,
  Star,
  Crown,
  MessageSquare,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Star as StarIcon,
} from "lucide-react";
import {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
  togglePlanActive,
  togglePlanPopular,
  Plan,
} from "@/lib/api/plans";
import { PlansIconFallback } from "@/components/home/PlansIconFallback";

export function PlanManager() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Partial<Plan> | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const colorOptions = [
    { value: "blue", label: "Azul" },
    { value: "indigo", label: "Índigo" },
    { value: "purple", label: "Roxo" },
    { value: "amber", label: "Âmbar" },
    { value: "green", label: "Verde" },
  ];

  const iconOptions = [
    {
      value: "sparkles",
      label: "Sparkles",
      icon: <Sparkles className="h-5 w-5" />,
    },
    { value: "rocket", label: "Rocket", icon: <Rocket className="h-5 w-5" /> },
    { value: "star", label: "Star", icon: <Star className="h-5 w-5" /> },
    { value: "crown", label: "Crown", icon: <Crown className="h-5 w-5" /> },
    {
      value: "message",
      label: "Message",
      icon: <MessageSquare className="h-5 w-5" />,
    },
  ];

  // Load plans
  useEffect(() => {
    loadPlans();
  }, []);

  async function loadPlans() {
    setLoading(true);
    try {
      const data = await getPlans();
      setPlans(data);
    } catch (error) {
      console.error("Error loading plans:", error);
    } finally {
      setLoading(false);
    }
  }

  // Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!currentPlan) return;

    try {
      // Make sure features is an array
      let features = currentPlan.features;
      if (typeof features === "string") {
        features = (features as string)
          .split("\n")
          .filter((f) => f.trim() !== "");
      }

      const planData = {
        ...currentPlan,
        features,
        price_monthly: Number(currentPlan.price_monthly),
        price_semiannual: Number(currentPlan.price_semiannual),
        price_annual: Number(currentPlan.price_annual),
      };

      if (isCreating) {
        await createPlan(planData as Omit<Plan, "id">);
      } else if (currentPlan.id) {
        await updatePlan(currentPlan.id, planData);
      }

      await loadPlans();
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error saving plan:", error);
    }
  }

  // Handle plan deletion
  async function handleDelete() {
    if (!currentPlan?.id) return;

    try {
      await deletePlan(currentPlan.id);
      await loadPlans();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  }

  // Handle toggling plan active status
  async function handleToggleActive(id: string, active: boolean) {
    try {
      await togglePlanActive(id, active);
      await loadPlans();
    } catch (error) {
      console.error("Error toggling plan active status:", error);
    }
  }

  // Handle toggling plan popular status
  async function handleTogglePopular(id: string, popular: boolean) {
    try {
      await togglePlanPopular(id, popular);
      await loadPlans();
    } catch (error) {
      console.error("Error toggling plan popular status:", error);
    }
  }

  // Open edit dialog
  function openEditDialog(plan?: Plan) {
    if (plan) {
      // Convert features array to string for textarea
      const featuresStr = Array.isArray(plan.features)
        ? plan.features.join("\n")
        : "";

      setCurrentPlan({
        ...plan,
        features: featuresStr,
      });
      setIsCreating(false);
    } else {
      setCurrentPlan({
        name: "",
        price_monthly: 0,
        price_semiannual: 0,
        price_annual: 0,
        icon_type: "sparkles",
        color: "blue",
        features: "",
        popular: false,
        active: true,
      });
      setIsCreating(true);
    }
    setIsEditDialogOpen(true);
  }

  // Open delete dialog
  function openDeleteDialog(plan: Plan) {
    setCurrentPlan(plan);
    setIsDeleteDialogOpen(true);
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Planos</h1>
        <Button
          onClick={() => openEditDialog()}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Novo Plano
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`overflow-hidden ${!plan.active ? "opacity-60" : ""}`}
            >
              <CardHeader
                className={`bg-${plan.color}-50 dark:bg-${plan.color}-900/10`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div
                      className={`rounded-full p-2 bg-${plan.color}-100 dark:bg-${plan.color}-900/30 mr-3 h-10 w-10 flex items-center justify-center`}
                    >
                      <PlansIconFallback
                        iconType={plan.iconType}
                        color={
                          plan.color === "blue"
                            ? "#3b82f6"
                            : plan.color === "indigo"
                              ? "#6366f1"
                              : plan.color === "purple"
                                ? "#a855f7"
                                : plan.color === "amber"
                                  ? "#f59e0b"
                                  : "#16a34a"
                        }
                        size={20}
                      />
                    </div>
                    <CardTitle>{plan.name}</CardTitle>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleTogglePopular(plan.id, !plan.popular)
                      }
                      className={
                        plan.popular ? "text-yellow-500" : "text-gray-400"
                      }
                    >
                      <StarIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleActive(plan.id, !plan.active)}
                    >
                      {plan.active ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  <div className="flex space-x-4 mt-2">
                    <div>
                      <span className="text-xs text-gray-500">Mensal</span>
                      <p className="font-bold">R${plan.price_monthly}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Semestral</span>
                      <p className="font-bold">R${plan.price_semiannual}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Anual</span>
                      <p className="font-bold">R${plan.price_annual}</p>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <h4 className="font-medium mb-2 text-sm">Recursos:</h4>
                <ul className="space-y-1 text-sm">
                  {Array.isArray(plan.features) &&
                    plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="h-5 w-5 text-green-500 mr-2 flex-shrink-0">
                          •
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                </ul>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2 border-t pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openDeleteDialog(plan)}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Excluir
                </Button>
                <Button size="sm" onClick={() => openEditDialog(plan)}>
                  <Edit className="h-4 w-4 mr-1" /> Editar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Edit/Create Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isCreating ? "Criar Novo Plano" : "Editar Plano"}
            </DialogTitle>
            <DialogDescription>
              {isCreating
                ? "Preencha os detalhes para criar um novo plano."
                : "Modifique os detalhes do plano existente."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Básico</TabsTrigger>
                <TabsTrigger value="pricing">Preços</TabsTrigger>
                <TabsTrigger value="features">Recursos</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Plano</Label>
                    <Input
                      id="name"
                      value={currentPlan?.name || ""}
                      onChange={(e) =>
                        setCurrentPlan({ ...currentPlan, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color">Cor</Label>
                    <Select
                      value={currentPlan?.color || "blue"}
                      onValueChange={(value) =>
                        setCurrentPlan({ ...currentPlan, color: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma cor" />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center">
                              <div
                                className={`w-4 h-4 rounded-full bg-${option.value}-500 mr-2`}
                              ></div>
                              {option.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="icon_type">Ícone</Label>
                    <Select
                      value={currentPlan?.icon_type || "sparkles"}
                      onValueChange={(value) =>
                        setCurrentPlan({ ...currentPlan, icon_type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um ícone" />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center">
                              {option.icon}
                              <span className="ml-2">{option.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 flex items-center">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="active"
                        checked={currentPlan?.active || false}
                        onCheckedChange={(checked) =>
                          setCurrentPlan({ ...currentPlan, active: checked })
                        }
                      />
                      <Label htmlFor="active">Ativo</Label>
                    </div>

                    <div className="flex items-center space-x-2 ml-6">
                      <Switch
                        id="popular"
                        checked={currentPlan?.popular || false}
                        onCheckedChange={(checked) =>
                          setCurrentPlan({ ...currentPlan, popular: checked })
                        }
                      />
                      <Label htmlFor="popular">Mais Vendido</Label>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4 py-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price_monthly">Preço Mensal (R$)</Label>
                    <Input
                      id="price_monthly"
                      type="number"
                      value={currentPlan?.price_monthly || 0}
                      onChange={(e) =>
                        setCurrentPlan({
                          ...currentPlan,
                          price_monthly: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price_semiannual">
                      Preço Semestral (R$)
                    </Label>
                    <Input
                      id="price_semiannual"
                      type="number"
                      value={currentPlan?.price_semiannual || 0}
                      onChange={(e) =>
                        setCurrentPlan({
                          ...currentPlan,
                          price_semiannual: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price_annual">Preço Anual (R$)</Label>
                    <Input
                      id="price_annual"
                      type="number"
                      value={currentPlan?.price_annual || 0}
                      onChange={(e) =>
                        setCurrentPlan({
                          ...currentPlan,
                          price_annual: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="features">Recursos (um por linha)</Label>
                  <Textarea
                    id="features"
                    value={currentPlan?.features || ""}
                    onChange={(e) =>
                      setCurrentPlan({
                        ...currentPlan,
                        features: e.target.value,
                      })
                    }
                    rows={8}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Adicione cada recurso em uma linha separada.
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {isCreating ? "Criar Plano" : "Salvar Alterações"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Plano</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o plano "{currentPlan?.name}"? Esta
              ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

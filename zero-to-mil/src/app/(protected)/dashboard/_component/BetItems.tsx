import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppMutation } from "@/lib/api";
import { cn } from "@/lib/utils";
import { OddList } from "@/types/base";
import { BetSlipProps } from "@/types/base/betslip";
import { isString, set } from "lodash";
import React, { useEffect, useState } from "react";
import { BetItemsSkeleton } from "./BetItemsSkeleton";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { getPageRoutes } from "@/utils/getRoutes";
import { useAppStore } from "@/store";
import { format } from "date-fns-tz";
import { parseISO } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ArrowLeft } from "lucide-react";
import { formatLabel } from "@/utils/titleFormatter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  BetAccordionTrigger,
} from "@/components/ui/accordion";

function BetItems({
  itemKey,
  activeSlip,
}: {
  itemKey: string;
  activeSlip: BetSlipProps[];
}) {
  const [activeTab, setActiveTab] = useState("Goals");
  const router = useRouter();
  const queryClient = useQueryClient();
  const { numberOfSlips, setSlip } = useAppStore((store) => store);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSportKey, setSelectedSportKey] = useState<string | null>(null);
  const { messages: oddList } = useWebSocket<OddList[]>("odds_list", {
    filters: { sport_key: itemKey },
  });
  const { toast: htoast } = useToast();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [itemKey]);

  const { mutate } = useAppMutation<BetSlipProps>("betSlip", {
    onSuccess: () => {
      setSlip(numberOfSlips + 1);
      queryClient.invalidateQueries({ queryKey: ["betSlip"] });
      htoast({
        title: "Bet added to slip",
        description: "You can view your slip by clicking the button below",
        variant: "success",
        duration: 1000,
        action: (
          <Button
            onClick={() => router.push(getPageRoutes("betslip"))}
            variant="white"
          >
            View Slip
          </Button>
        ),
      });
    },
    onError: (error) => {
      isString(error) &&
        htoast({
          title: "Error",
          description: error,
          variant: "destructive",
          duration: 5000,
        });
    },
  });

  if (isLoading || !oddList || oddList?.length === 0) {
    return <BetItemsSkeleton />;
  }

  const activeProps = oddList.find(
    (odds) => odds.sport_key === selectedSportKey
  );

  const propsToDisplay = activeProps?.bookmaker?.props?.[activeTab] || [];

  console.log("propsToDisplay", propsToDisplay);

  console.log("oddList", oddList);
  console.log("activeProps", activeProps);

  return (
    <Drawer direction="right">
      <div
        className={`grid ${
          oddList.length <= 2
            ? "grid-cols-1"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        } gap-4`}
        onClick={(e) => e.stopPropagation()}
      >
        {oddList &&
          oddList?.map((odds, index) => {
            const selected = activeSlip.find(
              (item) => item.sport_id === odds.id
            );
            return (
              <DrawerTrigger asChild key={`${odds?.sport_key}-${index}`}>
                <div
                  className={cn(
                    "flex-column bg-greenbetcard border rounded mx-2 mb-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  )}
                  onClick={() => {
                    setSelectedSportKey(odds.sport_key);
                    setActiveTab(Object.keys(odds.bookmaker.props)[0]);
                  }}
                >
                  {odds?.home_team && odds?.away_team && (
                    <div className="grid grid-cols-[1fr,auto,1fr] gap-2 w-full px-2 sm:px-2 items-center">
                      <div className="rounded p-2 text-xs sm:text-xs truncate text-end">
                        {odds?.home_team}
                      </div>
                      <div className="font-bold text-xs sm:text-sm px-1">
                        VS
                      </div>
                      <div className="rounded p-2 text-xs sm:text-xs truncate text-start">
                        {odds?.away_team}
                      </div>
                    </div>
                  )}

                  <p className="text-center mt-1 text-xs text-greyf">
                    {format(
                      parseISO(odds?.commence_time || odds?.last_update),
                      "dd/MM/yyyy HH:mm",
                      {
                        timeZone:
                          Intl.DateTimeFormat().resolvedOptions().timeZone,
                      }
                    )}
                  </p>

                  {/* {odds?.bookmaker?.markets?.map((item, index) => (
                    <div
                      className="grid auto-cols-fr gap-2 px-1 py-2 "
                      style={{
                        gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${
                          odds.home_team ? "50px" : "100px"
                        }), 1fr))`,
                      }}
                      key={`${item.key}_${index}`}
                    >
                      {item.outcomes
                        ?.sort((a, b) => {
                          const getOrder = (name: string) => {
                            if (name === odds.home_team) return 1;
                            if (name === "Draw") return 2;
                            if (name === odds.away_team) return 3;
                            return 4;
                          };

                          return getOrder(a.name) - getOrder(b.name);
                        })
                        .map((outcome, index) => (
                          <div
                            className={cn(
                              `flex flex-col items-center justify-between bg-greenbetcard shadow-[0_0_15px_rgba(255,255,255,0.1)]  rounded p-1 hover:bg-opacity-80 transition-all cursor-pointer flex-1`
                            )}
                            key={`${outcome.name}_${index}`}
                            onClick={() =>
                              mutate({
                                sport_id: odds.id,
                                sport_key: odds.sport_key,
                                sport_title: odds.sport_title,
                                home_team: odds.home_team,
                                away_team: odds.away_team,
                                bookmaker_key: odds.bookmaker?.key,
                                selected_team: outcome.name,
                                odds: outcome.point || outcome.price,
                                market_key: item.key,
                              })
                            }
                          >
                            <p className="text-xs text-center mb-1 break-words w-full text-greyf">
                              {outcome.name === odds.home_team
                                ? "1"
                                : outcome.name === odds.away_team
                                ? "2"
                                : outcome.name === "Draw"
                                ? "X"
                                : outcome.name}
                            </p>
                            <p
                              className={cn(
                                "bg-pointinput py-2 px-4 rounded w-full text-center text-sm font-semibold",
                                {
                                  "text-haravara bg-haravara-foreground":
                                    selected?.selected_team === outcome.name,
                                }
                              )}
                            >
                              {outcome.point || outcome.price}
                            </p>
                          </div>
                        ))}
                    </div>
                  ))} */}

                  {Object?.entries(odds?.bookmaker?.odds?.ml || {}).length >
                    0 && (
                    <div className="grid grid-cols-4 gap-2 px-1 py-2">
                      {Object?.entries(odds?.bookmaker?.odds?.ml).map(
                        ([key, outcome], index) => (
                          <div
                            className={cn(
                              "col-span-2 flex flex-col items-center justify-between bg-greenbetcard  rounded p-1 hover:bg-opacity-80 transition-all cursor-pointer flex-1"
                            )}
                            style={{
                              gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${
                                odds.home_team ? "50px" : "100px"
                              }), 1fr))`,
                            }}
                            key={`${key}_${index}`}
                            onClick={
                              () => console
                              // mutate({
                              //   sport_id: odds.id,
                              //   sport_key: odds.sport_key,
                              //   sport_title: odds.sport_title,
                              //   home_team: odds.home_team,
                              //   away_team: odds.away_team,
                              //   bookmaker_key: odds.bookmaker?.key,
                              //   selected_team: outcome.name,
                              //   odds: outcome.price,
                              //   market_key: "ml",
                              // })
                            }
                          >
                            <p className="text-xs text-center mb-1 break-words w-full text-greyf">
                              {formatLabel(key)}-ml
                            </p>
                            <p
                              className={cn(
                                "bg-white py-2 px-4 rounded w-full text-center text-sm font-semibold",
                                {
                                  "text-black opacity-60":
                                    selected?.selected_team === outcome.oddId,
                                }
                              )}
                            >
                              {outcome.odds}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {Object?.entries(odds?.bookmaker?.odds?.ml3way || {}).length >
                    0 && (
                    <div className="grid grid-cols-6 gap-2 px-1 py-2">
                      {Object?.entries(odds?.bookmaker?.odds?.ml3way).map(
                        ([key, outcome], index) => (
                          <div
                            className={cn(
                              "col-span-2 flex flex-col items-center justify-between w-full bg-greenbetcard  rounded p-1 hover:bg-opacity-80 transition-all cursor-pointer flex-1"
                            )}
                            key={`${key}_${index}`}
                            onClick={
                              () => console
                              // mutate({
                              //   sport_id: odds.id,
                              //   sport_key: odds.sport_key,
                              //   sport_title: odds.sport_title,
                              //   home_team: odds.home_team,
                              //   away_team: odds.away_team,
                              //   bookmaker_key: odds.bookmaker?.key,
                              //   selected_team: outcome.name,
                              //   odds: outcome.price,
                              //   market_key: "ml",
                              // })
                            }
                          >
                            <p className="text-xs text-center mb-1 break-words  text-greyf background-transparent">
                              {formatLabel(key)}-ml3way
                            </p>
                            <p
                              className={cn(
                                "bg-white py-2 px-4 rounded w-full  text-center text-sm font-semibold",
                                {
                                  "text-black  opacity-60":
                                    selected?.selected_team === outcome.oddId,
                                }
                              )}
                            >
                              {outcome.odds}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </DrawerTrigger>
            );
          })}
        <DrawerContent className="fixed right-0 top-0 min-h-screen w-full sm:w-1/2 transform translate-x-full data-[state=open]:translate-x-0 transition-transform duration-300 ease-in-out bg-background left-auto z-50 m-0 p-0 translate-y-0 shadow-lg font-seoge">
          <div className="min-h-screen text-white">
            <div className="relative">
              <div
                className="h-80 bg-cover bg-center relative"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(246, 234, 234, 0.6), rgba(219, 211, 211, 0.6)), url('/placeholder.svg?height=320&width=400')",
                  backgroundSize: "cover",
                }}
              >
                <div className="flex items-center justify-between p-4">
                  <DrawerClose asChild>
                    <ArrowLeft className="w-6 h-6" />
                  </DrawerClose>
                  <h1 className="text-xl font-semibold">Champions League</h1>
                  <div className="w-6" />
                </div>

                <div className="flex flex-col items-center justify-center flex-1 px-4 mt-8">
                  <div className="flex items-center justify-center space-x-8 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">FCB</span>
                      </div>
                      <span className="text-sm">FC Barcelona</span>
                    </div>

                    <span className="text-sm text-gray-300">VS</span>

                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-black">RM</span>
                      </div>
                      <span className="text-sm">Realmadrid FC</span>
                    </div>
                  </div>

                  {/* Match Details */}
                  <div className="text-center">
                    <p className="text-sm text-gray-300 mb-1">
                      6th Feb, 2024 12:45 pm
                    </p>
                    <p className="text-sm text-gray-300">Santiago, Bernebeu</p>
                  </div>

                  <div className="mt-8">
                    <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 bg-gray-500 rounded-full relative">
                        <div className="absolute inset-2 border-2 border-gray-400 rounded-full">
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative -mt-4 rounded-xl overflow-hidden bg-input shadow-lg">
              <div className="flex overflow-x-auto  px-4 pt-6 space-x-2">
                {Object?.entries(activeProps?.bookmaker?.props || {}).map(
                  ([key, value], index) => (
                    <Button
                      key={index}
                      variant={activeTab === key ? "default" : "ghost"}
                      size="sm"
                      className={`whitespace-nowrap rounded ${
                        activeTab === key
                          ? "bg-primary hover:bg-primary text-white"
                          : "bg-slate-700 hover:bg-slate-600 text-white"
                      }`}
                      onClick={() => setActiveTab(key)}
                    >
                      {formatLabel(key, " ")}
                    </Button>
                  )
                )}
              </div>

              <div className="p-4 space-y-3 overflow-y-auto max-h-[calc(100vh-200px)]">
                <Accordion
                  type="single"
                  className="border rounded mt-4 bg-menu space-y-2"
                  collapsible
                >
                  {propsToDisplay?.map((outcome, index) => (
                    <AccordionItem
                      key={index}
                      value={`${outcome.title}-${index}`}
                      onClick={() => {
                        console.log("test");
                      }}
                      className="bg-greenbetcard rounded shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    >
                      <BetAccordionTrigger>
                        <span className="text-white font-medium ml-2">
                          {outcome.title}
                        </span>
                      </BetAccordionTrigger>
                      <AccordionContent>
                        <div className="px-4 pb-4 rounded w-full space-y-2">
                          {outcome.points.map((point, pointIndex) => (
                            <div
                              key={pointIndex}
                              className="bg-white hover:bg-slate-500 text-white flex items-center justify-between p-3 h-auto opacity-60"
                            >
                              <span className="text-black">
                                {point.game_name}
                              </span>
                              <span className="font-bold text-black">
                                {point.odds}
                              </span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </DrawerContent>
      </div>
    </Drawer>
  );
}

export default BetItems;

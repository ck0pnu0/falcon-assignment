import { ButtonsComponent } from "./buttons.component";

describe("ButtonsComponent", () => {
  it("should create successfully", () => {
    // ARRANGE
    const { build } = setup();
    const component = build();
    // ACT
    component.ngOnInit();
    // ASSERT
    expect(component).toBeTruthy();
  });
});

function setup() {
  const builder = {
    default() {},
    build() {
      return new ButtonsComponent();
    }
  };
  return builder;
}
